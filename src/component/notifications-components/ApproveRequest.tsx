import React from "react";
import { Card, CardContent, CardActions, Button, Typography, Stack, Box } from "@mui/material";

interface ApproveRequestCardProps {
  title?: string;
  description?: string;
  onApprove?: () => void;
  onReject?: () => void;
  onRequest?: () => void;
  approveLabel?: string;
  rejectLabel?: string;
  requestLabel?: string;
}

const ApproveRequestCard: React.FC<ApproveRequestCardProps> = ({
  title = "Approve Request",
  description = "Would you like to approve, reject, or request more information?",
  onApprove,
  onReject,
  onRequest,
  approveLabel = "Approve",
  rejectLabel = "Reject",
  requestLabel = "Request",
}) => {
  return (
    <Card sx={{ maxWidth: 400, margin: "0 auto", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2} width="100%" justifyContent="center">
          <Button
            variant="contained"
            color="success"
            onClick={onApprove}
          >
            {approveLabel}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={onReject}
          >
            {rejectLabel}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onRequest}
          >
            {requestLabel}
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ApproveRequestCard;
