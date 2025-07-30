import { Dialog } from "@mui/material";

import LogInForm from "../LogInForm";

interface ILogInModalProps {
    open: boolean;
    onClose: () => void;
}

const LogInModal = (props: ILogInModalProps) => {
    const { open, onClose } = props;
    return (
        <Dialog open={open} onClose={onClose}>
            <LogInForm />
        </Dialog>
    )
}

export default LogInModal;