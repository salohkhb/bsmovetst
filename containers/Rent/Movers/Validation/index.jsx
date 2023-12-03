import Routes from "../../../../helpers/routes";
import styles from "./index.module.css";
import messages from "./messages";
import Button from "../../../../components/Button";
import {useEffect, useState} from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/router';
import {useRent} from "../../../../hooks/rent";
import {isObjectEmpty} from "../../../../helpers/functions";


const VehicleRentValidation = () => {
    const router = useRouter();
    const { clearRent } = useRent()
    const { rent } = useRent()
    const [rentType, setRentType] = useState('movers')

    useEffect(() => {
        if (router.query.name) {
            setRentType(router.query.name)
        }
    }, [router])

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (isObjectEmpty(rent?.movers)) {
            router.replace(Routes.HOME_PAGE);
        }
    }, [rent])

    function handleBackToMainPage() {
        clearRent()
        return router.push(Routes.HOME_PAGE);
    }

    return (
        <div className={styles.confirm_vehicle_rent_container}>
            <div>
                <CheckCircleIcon className={styles.confirm_vehicle_rent_icon} />
            </div>
            <div>
                <div className={styles.confirm_vehicle_rent_title}>{messages.title[rentType]}</div>
            </div>
            <div className={styles.confirm_vehicle_rent_contact_informations}>
                <span>{messages.contact}</span>
            </div>
            <div className={styles.confirm_vehicle_rent_action_container}>
                <Button outlined onClick={handleBackToMainPage}>{messages.action}</Button>
            </div>
        </div>
    )
}
export default VehicleRentValidation;