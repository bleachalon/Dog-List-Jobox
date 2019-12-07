import React from "react";
import Image from "react-bootstrap/Image";
import InfiniteScroll from 'react-infinite-scroller';
import './CSS/ImageStyleSheet.css';

/**
 * Render Dog Images.
 * Resize Images, add Hover effect.
 * User can click images for original image url
 * @param breedImage array of image urls
 * @param loadFunc loading more images used by <InfiniteScroll>
 * @returns {*}
 * @constructor
 */
const ImageComponent = ({breedImage, loadFunc}) =>
    <div style={{paddingTop: "120px"}}>
        <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={true}
            loader={<div className="loader" key={0}>Coming soon ...</div>}>
            {
                breedImage.map((image) =>
                    <a href={image}><Image  className={"pic"} src={image} key={image} alt={image}
                                           style={{width: '20rem', height: '21rem', margin: "1rem 1rem 1rem 1rem"}}/></a>
                )

            }
        </InfiniteScroll>
    </div>

export default ImageComponent;
