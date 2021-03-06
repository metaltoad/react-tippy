import { Browser, Selectors } from './globals'

import isVisible                        from '../utils/isVisible'
import closest                          from '../utils/closest'
import cursorIsOutsideInteractiveBorder from '../utils/cursorIsOutsideInteractiveBorder'

/**
* Returns relevant listener callbacks for each ref
* @param {Element} el
* @param {Element} popper
* @param {Object} settings
* @return {Object} - relevant listener callback methods
*/
export default function getEventListenerHandlers(el, popper, settings) {

    const {
        position,
        delay,
        duration,
        hideDelay,
        interactive,
        interactiveBorder,
        distance,
        hideOnClick,
        trigger,
        touchHold,
        touchWait
    } = settings

    let delayShow, delayHide

    const clearTimeouts = () => {
        clearTimeout(delayShow)
        clearTimeout(delayHide)
    }

    const _show = () => {
        clearTimeouts()

        // Not hidden. For clicking when it also has a `focus` event listener
        if (isVisible(popper)) return
        const _delay = Array.isArray(delay) ? delay[0] : delay

        if (delay) {
            delayShow = setTimeout(() => this.show(popper), _delay)
        } else {
            this.show(popper)
        }
    }

    const show = event =>
        this.callbacks.wait ? this.callbacks.wait.call(popper, _show, event) : _show()

    const hide = () => {
        clearTimeouts()

        const _delay = Array.isArray(hideDelay) ? hideDelay[1] : hideDelay

        if (hideDelay) {
            delayHide = setTimeout(() => this.hide(popper), _delay)
        } else {
            this.hide(popper)
        }
    }

    const handleTrigger = event => {

      const mouseoverTouch = event.type === 'mouseover' && Browser.SUPPORTS_TOUCH && Browser.touch

        if (mouseoverTouch && touchHold) return

        // Toggle show/hide when clicking click-triggered tooltips
        const isClick = event.type === 'click'
        const isNotPersistent = hideOnClick !== 'persistent'

        isClick && isVisible(popper) && isNotPersistent ? hide() : show(event)

        if (mouseoverTouch && Browser.iOS() && el.click) {
            el.click()
        }
    }

    const handleMouseout = event => {

        // Don't fire 'mouseout', use the 'touchend'
        if (event.type === 'mouseout' && Browser.SUPPORTS_TOUCH &&
        Browser.touch && touchHold) {
            return
        }

        if (interactive) {
            // Temporarily handle mousemove to check if the mouse left somewhere
            // other than its popper
            const handleMousemove = event => {

                const triggerHide = () => {
                    document.body.removeEventListener('mouseout', hide)
                    document.removeEventListener('mousemove', handleMousemove)
                    hide()
                }

                const closestTooltippedEl = closest(event.target, Selectors.TOOLTIPPED_EL)

                const isOverPopper = closest(event.target, Selectors.POPPER) === popper
                const isOverEl = closestTooltippedEl === el
                const isClickTriggered = trigger.indexOf('click') !== -1
                const isOverOtherTooltippedEl = closestTooltippedEl && closestTooltippedEl !== el

                if (isOverOtherTooltippedEl) {
                    return triggerHide()
                }

                if (isOverPopper || isOverEl || isClickTriggered) return

                if (cursorIsOutsideInteractiveBorder(event, popper, settings)) {
                    triggerHide()
                }
            }

            document.body.addEventListener('mouseout', hide)
            document.addEventListener('mousemove', handleMousemove)

            return
        }

        // If it's not interactive, just hide it
        hide()
    }

    const handleBlur = event => {
        // Ignore blur on touch devices, if there is no `relatedTarget`, hide
        // If the related target is a popper, ignore
        if (Browser.touch || ! event.relatedTarget) return
        if (closest(event.relatedTarget, Selectors.POPPER)) return

        hide()
    }

    return {
        handleTrigger,
        handleMouseout,
        handleBlur
    }
}
