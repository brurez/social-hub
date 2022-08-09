import Box from "@mui/material/Box";

export default function FormSection({children}) {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 800,
        marginX: 'auto'
      }}
    >
      {children}
    </Box>
  )
}