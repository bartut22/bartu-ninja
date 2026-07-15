'use client'

import Flickity from 'react-flickity-component'
import styles from './projectsCarousel.module.css'

const flickityOptions = {
    // options
    cellAlign: 'center',
    imagesLoaded: true,
    wrapAround: true,
    percentPosition: true,
    dragThreshold: 50,
    selectedAttraction: 0.01,
    friction: 0.15,
    initialIndex: 0,
}

import CarouselCell from './carouselCell'

export default function ProjectsCarousel(props) {
  if (!props?.projects) return null;
  if (!Array.isArray(props.projects))
    throw new Error("projects is not an array");

  return (
    <Flickity
      className={styles.mainCarousel} // default ''
      elementType={"div"} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={true} // default false
      reloadOnUpdate={false} // default false
      static={true} // default false
    >
      {/* {projects.items.map(item => <div className={styles.carouselCell} key={item.id}>{item.title}: {item.description}</div>)} */}

      {props.projects.map((item) => {
        if (typeof item.description !== "string")
          throw new Error(`description missing for item ${item.id}`);
        if (item.image === undefined)
          throw new Error(`image missing for item ${item.id}`);

        return (
          <CarouselCell
            key={item.id}
            title={item.title}
            link={item.link}
            description={item.description}
            image={props.images[item.image]}
          ></CarouselCell>
        );
      })}
    </Flickity>
  );
}