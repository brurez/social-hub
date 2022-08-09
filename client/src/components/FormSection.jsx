import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function FormSection({children}) {
  return (
    <Paper
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 800,
        marginX: 'auto',
        p: 4
      }}
    >
      {children}
    </Paper>
  )
}