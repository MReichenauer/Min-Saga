declare module "react-flip-page" {
  import { ReactNode } from "react";

  // Props for the FlipPage component
  type FlipPageProps = {
    /**
     * Orientation of swipes.
     * vertical or horizontal for respectively up/down swipes and left/right swipes
     * `Default vertical`
     */
    orientation?: "horizontal" | "vertical";

    /**
     * If true, the pages will be allowed to overflow through the container.
     * The original effect is to keep everything inside the container, but you can set this to true to have a more "bookish" effect.
     * `Default false`
     */
    uncutPages?: boolean;

    /**
     *  Duration in ms of the fold/unfold animation
     * `Default 200`
     */
    animationDuration?: number;

    /**
     * Distance in px to swipe before the gesture is activated
     * `Default 10`
     */
    treshold?: number;

    /**
     * Angle of the page when there's nothing to display before/after
     * `Default 45`
     */
    maxAngle?: number;

    /**
     * Opacity of the masks that covers the underneath content
     * `Default 0.4`
     */
    maskOpacity?: number;

    /**
     * Perspective value of the page fold effect. The bigger, the less noticeable
     * `Default 130`
     */
    perspective?: string;

    /**
     * Background of the pages.
     * This can be overridden in individual pages by styling the component
     * `Default #fff`
     */
    pageBackground?: string;

    /**
     * Component that will be displayed under the first page
     * `Default null`
     */
    firstComponent?: ReactNode;

    /**
     * Component that will be displayed under the last page
     * `Default null`
     */
    lastComponent?: ReactNode;

    /**
     * Indicates if the component must hint the user on how it works.
     * Setting this to true will lift the bottom of the page 1s after the component is mounted, for 1s
     * `Default false`
     */
    showHint?: boolean;

    /**
     * Indicates if the component must hint the user on how it works.
     * Setting this to true will show an example of gesture to switch pages
     * `Default false`
     */
    showSwipeHint?: boolean;

    /**
     * Indicates if the component must hint the user on how it works.
     * Setting this to true will show a pointer indicating where to click to switch pages. Works with
     * `Default false`
     */
    showTouchHint?: boolean;

    /**
     * If true, the user can flip pages by touching/clicking a top/bottom or left/right zone.
     * These zones have CSS classes: rfp-touchZone, rfp-touchZone-previous and rfp-touchZone-next so that you can style them
     * `Default false`
     */
    flipOnTouch?: boolean;

    /**
     * Percentage of dimensions of the zone to touch/click to flip pages
     *` Default 210`
     */
    flipOnTouchZone?: number;

    /**
     * Additional style for the flipboard
     * `Default {}`
     */
    style?: React.CSSProperties;

    /**
     * Height for the flipboard
     * `Default 480px`
     */
    height?: number;

    /**
     * Width for the flipboard
     * `Default 320px`
     */
    width?: number;

    /**
     * Callback when the page has been changed.
     * @param pageIndex
     * @param direction
     */
    onPageChange?: (pageIndex: number, direction: "next" | "previous") => void;

    /**
     * Callback when the page starts to change. Parameters:
     * @param oldPageIndex
     * @param direction
     */
    onStartPageChange?: (oldPageIndex: number, direction: "next" | "previous") => void;

    /**
     * Callback when the user starts swiping
     */
    onStartSwiping?: () => void;

    /**
     * Callback when the user stops swiping
     */
    onStopSwiping?: () => void;

    /**
     * Optional CSS class to be applied on the container
     * `Default ""`
     */
    className?: string;

    /**
     * If true flipping after the last page will return to the first (and visa-versa)
     * `Default false`
     */
    loopForever?: boolean;

    /**
     * If true, the component will be responsive, meaning it will take all the available space.
     * Place the component in a container before to make sure it is visible
     * `Default false`
     */
    responsive?: boolean;

    /**
     * Default start position of the component
     * `Default 0`
     */
    startAt?: number;

    /**
     * If true, the user must swip in reverse order: user must swipe down/right to see the next page,
     * and up/left to see the previous page.
     * `Default false`
     */
    reverse?: boolean;

    /**
     * This array holds the CSS class names that the user can not initiate a swipe gesture from.
     * `Default []`
     */
    swipeImmune?: string[];

    /**
     * This disables the inset drop shadow on the inside of the flipping pages.
     * `Default false`
     */
    noShadow?: boolean;

    /**
     * Children of the component
     *`E.g <FlipPage><div>Content</div></FlipPage>`
     */
    children?: React.ReactNode;
  };

  // FlipPage methods
  export type FlipPageRefType = {
    gotoNextPage: () => void;
    gotoPreviousPage: () => void;
    gotoPage: (page: number) => void;
  };

  // FlipPage component
  const FlipPage: React.ForwardRefExoticComponent<FlipPageProps & React.RefAttributes<FlipPageRefType>>;

  export default FlipPage;
}
