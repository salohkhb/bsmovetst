import {useRent} from "../../../../hooks/rent";
import { useFormik } from "formik"
import Image from "next/legacy/image";
import DatePicker from "../../../../components/Pickers/DatePicker";
import MUISelect from '@mui/material/Select';
import MUIMenuItem from '@mui/material/MenuItem';
import {useState} from "react";
import Button from "../../../../components/Button";
import {CURRENCY} from "../../../../helpers/constants";
import GeolocationInput from "../../../../components/GeolocationInput";
import { useRouter } from 'next/router';
import Routes from "../../../../helpers/routes";

const RentSelectionHeader = () => {
    const { rent: { vehicle } } = useRent()

    function validate(values) {
        const errors = {};
        if (!values?.startAddress) errors.startAddress = "Merci d'ajouter une addresse de départ";
        if (!values?.endAddress) errors.endAddress = "Merci d'ajouter une addresse d'arrivée";
        if (!values?.startDate) errors.startDate = "Merci d'ajouter une date de départ";
        if (!values?.duration) errors.duration = "Merci d'ajouter une durée";
        if (values.onlyMovingMen && !values.nbMovingMen) errors.nbMovingMen = "Merci d'ajouter des déménageurs";
        return errors;
    }

    function handleVehiclesSearch(values) {
        console.log('values : ', values)
    }

    const formik = useFormik({
        initialValues: {
            startAddress: vehicle?.startAddress || '',
            endAddress: vehicle?.endAddress?.label || '',
            startDate: vehicle?.startDate || '',
            duration: vehicle?.duration || 0,
            nbMovingMen: vehicle?.nbMovingMen, // GET MOVERS FROM HOOK
        },
        // validate,
        onSubmit: handleVehiclesSearch,
    });
    return (
        <header style={{ padding: '54px 0', width: '100vw' }}>
            <div style={{ display: "flex", alignItems: 'center', gap: '0.5em', justifyContent: 'center' }}>
                <div style={{ width: '278px' }}>
                    <label>Départ</label>
                    <GeolocationInput
                        initialValue={formik.values.startAddress}
                        name={'startAddress'}
                        onChange={(value) => formik.setFieldValue('startAddress', value)}
                        placeholder={"Adresse de départ"}
                    />
                    {formik.errors.startAddress && formik.touched.startAddress && <span style={{ color: 'red' }}>{formik.errors.startAddress}</span>}
                </div>
                <div style={{ width: '278px' }}>
                    <label>Arrivée</label>
                    <GeolocationInput
                        initialValue={formik.values.startAddress}
                        name={'endAddress'}
                        onChange={(value) => formik.setFieldValue('endAddress', value)}
                        placeholder={"Adresse d'arrivée"}
                    />
                    {formik.errors.endAddress && formik.touched.endAddress && <span style={{ color: 'red' }}>{formik.errors.endAddress}</span>}
                </div>
                <div style={{ width: '180px' }}>
                    <label>Date</label>
                    <DatePicker
                        defaultValue={null}
                        name="startDate"
                        value={formik.values.startDate}
                        handleChange={(newValue) => {
                            formik.setFieldValue('startDate', newValue)
                        }}
                        fullWidth={true}
                        error={formik.errors.startDate}
                    />
                    {formik.errors.startDate && formik.touched.startDate && <span style={{ color: 'red' }}>{formik.errors.startDate}</span>}
                </div>
                <div style={{ width: '80px', display: 'flex', flexDirection: 'column' }}>
                    <label>Durée</label>
                    <MUISelect
                        label=""
                        name='duration'
                        value={formik.values.duration}
                        onChange={formik.handleChange}
                    >
                        <MUIMenuItem value={2}>2h</MUIMenuItem>
                        <MUIMenuItem value={4}>4h</MUIMenuItem>
                        <MUIMenuItem value={6}>6h</MUIMenuItem>
                        <MUIMenuItem value={8}>8h</MUIMenuItem>
                    </MUISelect>
                    {formik.errors.duration && formik.touched.duration && <span style={{ color: 'red' }}>{formik.errors.duration}</span>}
                </div>
                <div style={{ width: '80px', display: 'flex', flexDirection: 'column' }}>
                    <label>Déménageurs</label>
                    <MUISelect
                        label=""
                        name='nbMovingMen'
                        value={formik.values.nbMovingMen}
                        onChange={formik.handleChange}
                    >
                        <MUIMenuItem value={1}>1</MUIMenuItem>
                        <MUIMenuItem value={2}>2</MUIMenuItem>
                        <MUIMenuItem value={3}>3</MUIMenuItem>
                        <MUIMenuItem value={4}>4</MUIMenuItem>
                    </MUISelect>
                    {formik.errors.duration && formik.touched.duration && <span style={{ color: 'red' }}>{formik.errors.duration}</span>}
                </div>
                <div style={{
                    width: '120px',
                    height: '80px',
                }}>
                    <Button type="submit" extraStyle={{ display: 'flex', alignItems: 'flex-end' }}>Rechercher</Button>
                </div>
            </div>
        </header>
    )
}

const RentCard = ({ item }) => {
    console.log('item is : ', item)
    const { handleVehicleRentByKey } = useRent()
    const router = useRouter()

    function handleRentItem() {
        handleVehicleRentByKey('vehicle', item)
        router.push(Routes.VEHICLE_RENT_PAGE_SUMMARY)
    }
    return (
        <div style={{
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            borderRadius: "12px",
            border: '1px solid #DEDEDE',
            transition: "0.3s",
            backgroundColor: 'white',
            display: 'flex',
            padding: '26px',
            minHeight: '259px',
        }}>
            <div style={{ display: 'flex', width: '100%', gap: '2em' }}>
                <div style={{ position: 'relative', width: '350px' }}>
                    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                        <Image
                            layout="fill"
                            src="/images/logo.png"
                            alt={item.name}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '260px', gap: '1em' }}>
                        <h3>{item.name}</h3>
                        <span style={{ color: '#8B9197' }}>Longueur: {((item?.dimensions?.len) / 100).toFixed(2)}m</span>
                        <span style={{ color: '#8B9197' }}>Largeur: {((item?.dimensions?.width) / 100).toFixed(2)}m</span>
                        <span style={{ color: '#8B9197' }}>Hauteur: {((item?.dimensions?.height) / 100).toFixed(2)}m</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', gap: '0.5em' }}>
                        <h2 style={{ margin: 0, padding: 0 }}>{item.price}{CURRENCY.EUR}</h2>
                        <h2 style={{ margin: 0, padding: 0 }}>Total</h2>
                        <Button onClick={handleRentItem}>Louer ce véhicule</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RentSelectionContent = ({ list = [] }) => (
    <div style={{ padding: '56px 20%', backgroundColor: '#F9FAFB', display: 'flex', flexDirection: 'column', gap: '43px' }}>
        <div style={{ backgroundColor: '#F1F9F5', display: 'flex', flexDirection: 'column', gap: '0.5em', padding: '30px' }}>
            <h3>Information</h3>
            <p style={{ maxWidth: '75%', color: '#8B9197' }}>Vous allez commencer votre pré-réservation de véhicule de déménagement. Une fois terminée, l'agence concernée prendra contact avec vous pour valider votre dossier ainsi que la disponibilité du véhicule.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ padding: 0, margin: 0 }}>Choisissez votre véhicule</h2>
            <p style={{color: '#8B9197' }}>{list.length} véhicules trouvés à vos dates</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1em', minWidth: '100%', padding: 0 }}>
                {list.map((item, index) => (
                    <RentCard key={item.id + index} item={item} />
                ))}
            </ul>
        </div>
    </div>
)

const RentSelection = () => {
    // HERE WITH BACKEND GET THE TRUCKS
    const [list, setList] = useState([
        { id: 1, name: 'Camion dimensions intérieur d’un utilitaire 22m3', price: '172', dimensions: {
            height: 240, width: 205, len: 450}
        },
        { id: 2, name: 'Camion dimensions intérieur d’un utilitaire 30m3', price: '205', dimensions: {
            height: 270, width: 225, len: 490}
        },
        { id: 3, name: 'Camion dimensions intérieur d’un utilitaire 10m3', price: '100', dimensions: {
            height: 100, width: 100, len: 100}
        },
        { id: 4, name: 'Camion dimensions intérieur d’un utilitaire 50m3', price: '599', dimensions: {
            height: 300, width: 300, len: 300}
        },
        { id: 5, name: 'Camion dimensions intérieur d’un utilitaire 22m3', price: '172', dimensions: {
            height: 240, width: 205, len: 450}
        },
    ])
    return (
        <section>
            <article>
                <RentSelectionHeader />
                <RentSelectionContent list={list} />
            </article>
        </section>
    )
}

export default RentSelection