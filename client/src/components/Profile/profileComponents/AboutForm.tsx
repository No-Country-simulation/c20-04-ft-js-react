import React, { useState } from "react";
import { FaPaw } from "react-icons/fa";
import { CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const reasons = ["Spam", "Harassment", "Inappropriate Content", "Other"];

export default function AccountActions() {
  const [reportReason, setReportReason] = useState("");
  const [isReporting, setIsReporting] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [deactivateReason, setDeactivateReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReport = () => {
    setIsReporting(true);
  };

  const handleDeactivate = () => {
    setIsDeactivating(true);
  };

  const handleSubmitReport = () => {
    // Aquí envías el reporte al backend (ignorar para esta implementación)
    console.log("Reported for:", reportReason);
    setIsReporting(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000); // Simulación de carga
  };

  const handleSubmitDeactivate = () => {
    // Aquí envías la desactivación al backend (ignorar para esta implementación)
    console.log("Deactivated for:", deactivateReason);
    setIsDeactivating(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000); // Simulación de carga
  };

  return (
    <div className="flex flex-col items-center gap-[1.4rem] w-[90%] mx-auto max-w-[500px]">
      {/* Form title */}
      <label className="text-2xl font-bold text-center text-purple-600 flex items-center">
        Account Actions
        <FaPaw className="ml-2 text-purple-500" />
      </label>

      {/* Report button */}
      <button
        className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
        onClick={handleReport}
      >
        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Report"}
      </button>

      {/* Deactivate button */}
      <button
        className="mt-4 px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"
        onClick={handleDeactivate}
      >
        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Deactivate Account"}
      </button>

      {/* Report Dialog */}
      <Dialog open={isReporting} onClose={() => setIsReporting(false)}>
        <DialogTitle>Report Account</DialogTitle>
        <DialogContent>
          <label htmlFor="reportReason">Reason for Reporting</label>
          <select
            id="reportReason"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select a reason</option>
            {reasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsReporting(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitReport} color="primary" disabled={!reportReason}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Deactivate Dialog */}
      <Dialog open={isDeactivating} onClose={() => setIsDeactivating(false)}>
        <DialogTitle>Deactivate Account</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Reason for Deactivating"
            variant="outlined"
            value={deactivateReason}
            onChange={(e) => setDeactivateReason(e.target.value)}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeactivating(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitDeactivate} color="primary" disabled={!deactivateReason}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}