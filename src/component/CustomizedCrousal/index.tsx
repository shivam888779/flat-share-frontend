import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

interface ICustomizedCrousalProps {
    images: string[];
}

const CustomizedCrousal = (props: ICustomizedCrousalProps) => {
    const { images } = props;

    return (
        <div className="px-6 mx-auto my-6 max-h-96">
            <Carousel
                showThumbs={false}
            >
                {images.map((image, index) => (
                    <div key={index} style={{ width: "100%", height: "400px", position: "relative" }}>
                        <Image
                            src={image}
                            fill
                            style={{ objectFit: "contain", borderRadius: 8 }}
                            alt="Picture of the author"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CustomizedCrousal;