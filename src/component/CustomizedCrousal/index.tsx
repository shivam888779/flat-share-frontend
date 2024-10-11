import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

const CustomizedCrousal = () =>{

    
    return <div className="px-6 mx-auto my-6"> <Carousel>
    <div>
         <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
            width={125}
            height={125}
            alt="Picture of the author"
        />
        {/* <p className="legend">Legend 1</p> */}
    </div>
    <div>
         <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
            width={125}
            height={125}
            alt="Picture of the author"
        />
        {/* <p className="legend">Legend 1</p> */}
    </div>
    <div>
         <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
            width={125}
            height={125}
            alt="Picture of the author"
        />
        {/* <p className="legend">Legend 1</p> */}
    </div>
    <div>
         <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
            width={125}
            height={125}
            alt="Picture of the author"
        />
        {/* <p className="legend">Legend 1</p> */}
    </div>
    <div>
         <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
            width={125}
            height={125}
            alt="Picture of the author"
        />
        {/* <p className="legend">Legend 1</p> */}
    </div>
    <div>
         <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
            width={125}
            height={125}
            alt="Picture of the author"
        />
        {/* <p className="legend">Legend 1</p> */}
    </div>
    
</Carousel>
</div>
}

export default CustomizedCrousal;