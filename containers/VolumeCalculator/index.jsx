import { useState, useEffect, Fragment, useLayoutEffect } from "react";
import {
  Dialog,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Close from "@mui/icons-material/Close";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { findIndex, propEq } from "ramda";
import { useRouter } from "next/router";
import { useFormik } from "formik";

import { Subtitle } from "../../components/Texts";
import Button from "../../components/Button";
import Input from "../../components/Input";

import styles from "./index.module.css";
import messages from "./messages";
import DeleteDialog from "../../components/DeleteDialog";
import Autocomplete from "../../components/Autocomplete";
import API from "../../helpers/api";
import Counter from "../../components/Counter";
import {
  getTotalVolumeAndQuantityFromRooms,
  useEstimate,
} from "../../hooks/estimate";
import Routes from "../../helpers/routes";
import { METRICS } from "../../helpers/constants";

const VolumeCalculatorRoomItem = ({
  roomId,
  item = {},
  handleStateInc,
  handleStateDec,
}) => {
  const [count, setCount] = useState(item.quantity || 0);

  function handleCountInc() {
    handleStateInc(roomId, item);
    return setCount((prevCount) => prevCount + 1);
  }

  function handleCountDec() {
    handleStateDec(roomId, item);
    return setCount((prevCount) => prevCount - 1);
  }

  return (
    <div className={styles.calculator_room_item}>
      <div>{item.name}</div>
      <Counter
        minValue={0}
        maxValue={item?.stock <= count}
        value={count}
        handleInc={handleCountInc}
        handleDec={handleCountDec}
      />
    </div>
  );
};

const VolumeCalculatorRoom = ({
  room = {},
  removeRoomFromList,
  objectList = [],
  addItemToRoom,
  removeItemFromRoom,
}) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [roomList, setRoomList] = useState(room.items);

  function handleDeleteDialog() {
    return setDeleteDialog((prevState) => !prevState);
  }

  function addObjectToList(event, value) {
    if (!value) return;
    const option = objectList.find((obj) => obj.name === value);
    if (roomList.find((room) => room === option)) {
      return;
    }
    return setRoomList((prevRoomList) => [...prevRoomList, option]);
  }

  function handleStateInc(roomId, item) {
    addItemToRoom(roomId, item);
  }

  function handleStateDec(roomId, item) {
    removeItemFromRoom(roomId, item);
  }

  return (
    <>
      <Accordion
        defaultExpanded
        square={false}
        className={styles.volume_calculator_page_room_accordion}
      >
        <AccordionSummary
          className={styles.volume_calculator_page_accordion_header}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div
            className={styles.volume_calculator_page_accordion_header_content}
          >
            <div className={styles.volume_calculator_page_resume_room_name}>
              {room.name || "[non_defini]"}
            </div>
            <IconButton onClick={handleDeleteDialog} size="large">
              <DeleteForever fontSize="small" />
            </IconButton>
          </div>
        </AccordionSummary>
        <AccordionDetails
          className={styles.volume_calculator_page_accordion_content}
        >
          {roomList?.map((item, index) => (
            <Fragment key={`${item?.id}-${item?.name}-${index}`}>
              <VolumeCalculatorRoomItem
                key={`${item?.id}-${item?.name}-${index}`}
                roomId={room.id}
                item={item}
                handleStateInc={handleStateInc}
                handleStateDec={handleStateDec}
              />
              {roomList?.length > index + 1 && <Divider />}
            </Fragment>
          ))}
          <div className={styles.volume_autocomplete_container}>
            <Autocomplete
              handleChange={addObjectToList}
              options={objectList}
              messages={messages.calculator.roomAutocomplete}
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <DeleteDialog
        open={deleteDialog}
        item={`la pièce "${room.name || "[non_defini]"}"`}
        onClose={handleDeleteDialog}
        handleConfirm={() => removeRoomFromList(room.id)}
        handleDeny={handleDeleteDialog}
      />
    </>
  );
};

const RoomDialog = ({ open, onClose, handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      roomName: "",
    },
    validate: () => {},
    onSubmit: (values) => handleSubmit(values),
  });
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <div className={styles.room_dialog_container}>
        <div className={styles.room_dialog_header}>
          <Subtitle withMargin={false}>{messages.dialog.title}</Subtitle>
          <IconButton onClick={onClose} size="large">
            <Close />
          </IconButton>
        </div>
        <div>
          <form
            className={styles.room_dialog_content}
            onSubmit={formik.handleSubmit}
          >
            <Input
              label={messages.dialog.input.label}
              placeholder={messages.dialog.input.placeholder}
              name={messages.dialog.input.name}
              values={formik.values?.roomName}
              value={formik.values?.roomName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              type="text"
            />
            <Button type="submit" disabled={!formik?.values?.roomName}>
              {messages.dialog.action}
            </Button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

function filterDuplicate(list = []) {
  const dict = [];
  const newList = list.reduce((acc, current) => {
    if (
      dict.find(
        (dictItem) =>
          (dictItem.name === current.name && dictItem.size === current.size) ||
          dictItem.id === current.id
      )
    ) {
      console.warn("DUPLICATA : ", current.name);
    } else {
      dict.push(current);
      acc.push(current);
    }
    return acc;
  }, []);
  return newList;
}

const VolumeCalculatorContainer = () => {
  const {
    addToEstimateInventoryByKey,
    isFirstEstimateStepValid,
    estimate: { inventory },
  } = useEstimate();
  const router = useRouter();
  const [objectList, setObjectList] = useState([]);
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);

  function addRoom(name) {
    addToEstimateInventoryByKey("volume", {
      rooms: [
        ...(inventory?.volume?.rooms || []),
        { name, id: Date.now(), quantity: 0, volume: 0, items: [] },
      ],
    });
  }

  function deleteRoom(roomId) {
    const rooms = inventory?.volume?.rooms?.filter(
      (room) => room.id !== roomId
    );
    addToEstimateInventoryByKey("volume", {
      rooms,
    });
  }

  useLayoutEffect(() => {
    addToEstimateInventoryByKey("volume", {
      updatedByCalculator: true,
    });
    return () => {
      return addToEstimateInventoryByKey("volume", {
        updatedByCalculator: false,
      });
    };
  }, []);

  useEffect(() => {
    async function fetchObjectList() {
      const res = await API.get(`/Furnitures`);
      if (res?.data?.error && res.data.error.statusCode > 300) {
        return;
      }
      const listWithoutDuplicate = filterDuplicate(res.data); // in case the client gives a list with similar items
      setObjectList(listWithoutDuplicate);
    }

    if (inventory?.volume?.rooms?.length > 0 && !objectList?.length) {
      fetchObjectList();
    }
  }, [inventory?.volume?.rooms]);

  function handleRoomDialog() {
    return setRoomDialogOpen((prevState) => !prevState);
  }

  function addItemToList(list, key, item, type = "add") {
    const index = findIndex(propEq("id", key))(list);
    const newRoomsList = [...list];
    type === "add"
      ? (newRoomsList[index].volume =
          (newRoomsList[index].volume || 0) + item.size)
      : (newRoomsList[index].volume =
          (newRoomsList[index].volume || 0) - item.size);
    type === "add"
      ? (newRoomsList[index].quantity += 1)
      : (newRoomsList[index].quantity -= 1);
    const itemFound = newRoomsList[index]?.items?.findIndex(
      (listItem) => listItem.id === item.id
    );
    if (itemFound >= 0) {
      if (type === "add") {
        newRoomsList[index].items[itemFound].quantity += 1;
      } else {
        newRoomsList[index].items[itemFound].quantity -= 1;
      }
    } else {
      if (type === "add") {
        newRoomsList[index].items.push({ ...item, quantity: 1 });
      }
    }
    return newRoomsList;
  }

  function addItemToRoom(roomId, item) {
    // const roomPosition = rooms?.findIndex((room) => room.id === roomId);
    addToEstimateInventoryByKey("volume", {
      rooms: [...addItemToList(inventory?.volume?.rooms, roomId, item, "add")],
    });
    // return setRooms(previousRooms => addItemToList(previousRooms, roomId, volume));
  }

  function addVolumeToEstimate() {
    addToEstimateInventoryByKey("volume", {
      volumeKnown: true,
      volume: Number(
        getTotalVolumeAndQuantityFromRooms(inventory?.volume?.rooms).volume
      .toFixed(2)),
    });
    return router.push(Routes.ESTIMATE_INVENTORY_PAGE);
  }

  function removeItemFromRoom(roomId, item) {
    addToEstimateInventoryByKey("volume", {
      rooms: [...addItemToList(inventory?.volume?.rooms, roomId, item, "dec")],
    });
  }

  function addRoomToCalculator(values) {
    addRoom(values.roomName);
    return handleRoomDialog();
  }

  return (
    <div className={styles.volume_calculator_page_container}>
      <div className={styles.volume_calculator_page_calculator}>
        <h1>{messages.title}</h1>
        <div className={styles.volume_calculator_page_subtitle}>
          {messages.subtitle}
        </div>
        <div className={styles.volume_calculator_page_rooms_container}>
          {inventory?.volume?.rooms?.length ? (
            inventory.volume.rooms.map((room, index) => (
              <VolumeCalculatorRoom
                key={`${room?.name}-${index}`}
                objectList={objectList}
                removeRoomFromList={deleteRoom}
                room={room}
                addItemToRoom={addItemToRoom}
                removeItemFromRoom={removeItemFromRoom}
              />
            ))
          ) : (
            <div className={styles.volume_calculator_no_room}>
              {messages.noRoom}
            </div>
          )}
        </div>
        <div
          className={styles.volume_calculator_page_calculator_action_container}
        >
          <Button onClick={handleRoomDialog} outlined>
            {messages.calculator.action}
          </Button>
        </div>
      </div>
      <div className={styles.volume_calculator_page_resume}>
        <div className={styles.volume_calculator_page_resume_content}>
          <div className={styles.volume_calculator_page_resume_header}>
            <div className={styles.volume_calculator_page_resume_title}>
              {messages.resume.title}
            </div>
            <div className={styles.volume_calculator_page_subtitle}>{`${
              inventory?.volume?.quantity || 0
            } ${messages.resume.subtitle}`}</div>
          </div>
          <Divider />
          <div className={styles.volume_calculator_page_resume_items}>
            {inventory?.volume?.rooms?.length ? (
              inventory.volume.rooms.map((room) => (
                <div
                  key={room?.id}
                  className={styles.volume_calculator_page_resume_item_infos}
                >
                  <div
                    className={styles.volume_calculator_page_resume_room_name}
                  >
                    {room?.name || "[non_defini]"}
                  </div>
                  <div>{`${room?.volume.toFixed(2)} ${METRICS.CUBE}`}</div>
                </div>
              ))
            ) : (
              <div className={styles.volume_calculator_no_room}>
                {messages.noRoom}
              </div>
            )}
          </div>
          <Divider />
          <div className={styles.volume_calculator_page_resume_total_container}>
            {inventory?.volume?.rooms?.length ? (
              <div
                className={styles.volume_calculator_page_resume_total_volume}
              >
                <div
                  className={
                    styles.volume_calculator_page_resume_total_volume_number
                  }
                >{`${
                  getTotalVolumeAndQuantityFromRooms(
                    inventory?.volume?.rooms
                  ).volume?.toFixed(2) || 0
                } ${METRICS.CUBE}`}</div>
                <div
                  className={
                    styles.volume_calculator_page_resume_total_volume_info
                  }
                >{`${inventory?.volume?.quantity || 0} ${
                  messages.resume.subtitle
                }`}</div>
              </div>
            ) : null}
            <div
              className={styles.volume_calculator_page_resume_action_container}
              style={{
                display: isFirstEstimateStepValid() ? "inherit" : "none",
              }}
            >
              {/*<div className={styles.volume_calculator_page_resume_room_name}>{messages.resume.goBack}</div>*/}
              <Button
                disabled={!inventory?.volume?.rooms?.length}
                onClick={addVolumeToEstimate}
              >
                {messages.resume.action}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <RoomDialog
        open={roomDialogOpen}
        onClose={handleRoomDialog}
        handleSubmit={addRoomToCalculator}
      />
    </div>
  );
};

export default VolumeCalculatorContainer;
