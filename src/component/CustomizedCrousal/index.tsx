import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

interface ICustomizedCrousalProps {
    images: string[];
}

const CustomizedCrousal = (props:ICustomizedCrousalProps) =>{
    const {images} = props;
    console.log(images,"images")
    
    return <div className="px-6 mx-auto my-6"> <Carousel>
    {images.map((image,index)=>{
        return <div key={index}>
            <img src={image}
            width={125}
            height={125}
            alt="Picture of the author"
        />
        {/* <p className="legend">Legend 1</p> */}
    </div>
    })}
</Carousel>
</div>
}

export default CustomizedCrousal;