import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Box } from "@mui/material";
import { requestConnectionApi } from "@/api/connections";
import { useGlobalSnackbar } from "@/hooks/useSnackbar";
import { useGlobalContext } from "@/global-context";

interface RequestContactProps {
  open: boolean;
  onClose: () => void;
  userId: number
}

const RequestContact: React.FC<RequestContactProps> = ({ open, onClose, userId }) => {
  const [message, setMessage] = useState("");
  const snackBar = useGlobalSnackbar();
  const { fetchProfile } = useGlobalContext();
  const handleRequest = async () => {
    const { data } = await requestConnectionApi({ message: message, receiverId: userId })
    if (data?.status) {
      snackBar.success(data?.message);
      handleClose();
      onClose();
    } else {
      snackBar.error(data?.message);
      handleClose();
    }

  }


  const handleClose = () => {
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Request Contact Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1" mb={2}>
          Please provide a message or reason for requesting the contact details.
        </Typography>
        <Box mt={1}>
          <TextField
            label="Message"
            multiline
            minRows={3}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleRequest}
          color="primary"
          variant="contained"
          disabled={message.trim() === ""}
        >
          Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestContact;
