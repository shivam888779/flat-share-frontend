import { Box } from "@mui/material";

const LandingPageBottomView = () => {
    return <Box
        mt={-12}
        position={"relative"}
        height={'24rem'}
        overflow={"hidden"}
        sx={{
            // Hide on mobile and tablet, show only on desktop
            display: { xs: 'none', sm: 'block', md: 'block' },
            transition: 'all 0.5s ease',
            background: 'linear-gradient(to bottom, transparent, #dbeafe)'
        }}
    >
        {/* Clouds */}
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
        <div className="cloud cloud4"></div>

        {/* Buildings */}
        <div className={`building house1 hover:scale-105 hover-brightness-120`}></div>
        <div className={`building building2 hover:scale-105 hover-brightness-120`}></div>
        <div className={`building building3 hover:scale-105 hover-brightness-120`}></div>
        <div className={`building house4 hover:scale-105 hover-brightness-120`}></div>
        <div className={`building building5 hover:scale-105 hover-brightness-120`}></div>
    </Box>;
};

export default LandingPageBottomView;