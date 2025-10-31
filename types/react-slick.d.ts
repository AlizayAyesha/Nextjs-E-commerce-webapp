declare module 'react-slick' {
  export interface Settings {
    className?: string;
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    afterChange?: (currentSlide: number) => void;
    appendDots?: (dots: ReactElement) => JSX.Element;
    arrows?: boolean;
    asNavFor?: Slider;
    autoplay?: boolean;
    autoplaySpeed?: number;
    beforeChange?: (current: number, next: number) => void;
    centerMode?: boolean;
    centerPadding?: string;
    cssEase?: string;
    customPaging?: (i: number) => JSX.Element;
    dots?: boolean;
    dotsClass?: string;
    draggable?: boolean;
    easing?: string;
    edgeFriction?: number;
    fade?: boolean;
    focusOnSelect?: boolean;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: 'ondemand' | 'progressive';
    nextArrow?: JSX.Element;
    onEdge?: (swipeDirection: string) => void;
    onInit?: () => void;
    onLazyLoad?: (slidesToLoad: number[]) => void;
    onReInit?: () => void;
    onSwipe?: (swipeDirection: string) => void;
    pauseOnDotsHover?: boolean;
    pauseOnFocus?: boolean;
    pauseOnHover?: boolean;
    prevArrow?: JSX.Element;
    responsive?: { breakpoint: number; settings: Partial<Settings> | 'unslick'; }[];
    rows?: number;
    rtl?: boolean;
    slide?: string;
    slidesPerRow?: number;
    slidesToScroll?: number;
    slidesToShow?: number;
    speed?: number;
    swipe?: boolean;
    swipeEvent?: (swipeDirection: string) => void;
    swipeToSlide?: boolean;
    touchMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    useTransform?: boolean;
    variableWidth?: boolean;
    vertical?: boolean;
    verticalSwiping?: boolean;
    waitForAnimate?: boolean;
  }

  export class Slider extends React.Component<Settings & { children?: React.ReactNode }, any> {}

  export default Slider;
}
