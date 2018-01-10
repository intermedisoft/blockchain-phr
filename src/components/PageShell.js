import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import logo from '../logo.svg'

const PageShell = Page => {
  return props =>
    <div className='page'>
      <ReactCSSTransitionGroup
        transitionAppear
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={props.match.path === '/login' ? 'SlideOut' : 'SlideIn'}
      >
        {/* <img src={logo} alt='' /> */}
        <Page {...props} />
      </ReactCSSTransitionGroup>
    </div>
}

export default PageShell
