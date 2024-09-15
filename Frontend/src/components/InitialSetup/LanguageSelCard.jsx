import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';

function LanguageSelCard({ name, desc, desc2, handleChoice }) {
    return (
        <Card onClick={() => handleChoice(name)} sx={{ p: 1, width: 320, height: 290, display: 'flex', textAlign: 'left', backgroundColor: 'grey.100', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {desc}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {desc2}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default LanguageSelCard
