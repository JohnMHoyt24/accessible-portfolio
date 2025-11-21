import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import "./Carousel.css";

const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    const onSelect = () => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    };

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => emblaApi.off('select', onSelect);
    }, [emblaApi]);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide">Slide 1</div>
                    <div className="embla__slide">Slide 2</div>
                    <div className="embla__slide">Slide 3</div>
                </div>
            </div>
            <button
                className="embla__button embla__button--prev"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous slide"
            >
                ←
            </button>
            <button
                className="embla__button embla__button--next"
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next slide"
            >
                →
            </button>
        </div>
    );

}

export default Carousel;