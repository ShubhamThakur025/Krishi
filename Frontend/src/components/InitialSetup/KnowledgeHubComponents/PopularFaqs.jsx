
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import faqData from "../../../data/Popularfaqs.json";

const Popularfaqs = () => {
  return (
    <div>
           <Box
          sx={{
            display: "flex",
            mt: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            color="primary"
            sx={{ fontWeight: "semi-bold" }}
          >
            Frequently Asked Questions
          </Typography>
          </Box>
       
      {faqData.map((faq) => (
        <Accordion key={faq.id} sx={{ margin: "15px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${faq.id}-content`}
            id={`panel${faq.id}-header`}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{
                textAlign: "left",
                fontWeight: "italic",
                fontFamily: "sans-serif",
              }}
            >
              {faq.Question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ textAlign: "left" , fontFamily:"sans-serif" }}>
              {faq.Answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Popularfaqs;
