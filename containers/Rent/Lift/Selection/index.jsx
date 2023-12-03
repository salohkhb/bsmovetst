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
import FloorSelect from "../../../../components/Utilities/FloorSelect";

const LiftRentSelectionHeader = () => {
    const { rent: { lift } } = useRent()

    function handleLiftsSearch(values) {
        console.log('values : ', values)
        // TODO : GET ALL LIFTS HERE
    }

    const formik = useFormik({
        initialValues: {
            startAddress: lift?.startAddress || '',
            startDate: lift?.startDate || '',
            duration: lift?.duration || 0,
            floors: lift?.floors || 0,
        },
        onSubmit: handleLiftsSearch,
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>Etages</label>
                    <FloorSelect
                        label=''
                        name={'floors'}
                        onChange={formik.handleChange}
                        value={formik.values.floors}
                    />
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
    const { handleLiftRentByKey } = useRent()
    const router = useRouter()

    function handleRentItem() {
        handleLiftRentByKey('lift', item)
        router.push(Routes.LIFT_RENT_PAGE_SUMMARY)
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
                        <Button onClick={handleRentItem}>Louer ce monte-meubles</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const LiftRentSelectionContent = ({ list = [] }) => (
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

    // <MUIMenuItem value='towed'>Le tracté</MUIMenuItem>
    // <MUIMenuItem value='self-carried'>Auto porté</MUIMenuItem>
    // <MUIMenuItem value='electrical-ladder'>Échelle électrique</MUIMenuItem>
    // HERE WITH BACKEND GET THE LIFTS
    const [list, setList] = useState([
        { id: 1, name: 'Échelle électrique', price: '172', dimensions: {
                height: 100, width: 100, len: 100}
        },
        { id: 2, name: 'Monte meuble tracté', price: '205', dimensions: {
                height: 200, width: 200, len: 200}
        },
        { id: 3, name: 'Monte meuble auto-porté', price: '100', dimensions: {
                height: 300, width: 300, len: 300}
        },
    ])
    return (
        <section>
            <article>
                <LiftRentSelectionHeader />
                <LiftRentSelectionContent list={list} />
            </article>
        </section>
    )
}

export default RentSelection