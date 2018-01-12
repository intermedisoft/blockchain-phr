import React from 'react'
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
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
        {/* <div>test</div> */}
        <Page {...props} />
      </ReactCSSTransitionGroup>
    </div>
}

export default PageShell
