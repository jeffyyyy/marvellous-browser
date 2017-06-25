import React from 'react'
import './App.pcss'
import { Link } from 'react-router'
import Toolbar from './toolbar/components/Toolbar'
import Progress from 'react-progress-2'
import 'react-progress-2/main.css'
import { Helmet } from 'react-helmet'

export default class App extends React.Component {

  renderChildren (children) {
    if (!children) {
      return null
    }

    return children
  }

  renderRootContent (children) {
    if (children) {
      return null
    }

    return (
      <div className="home">
        <h1>
          <Link to="/comics">
            Comics
          </Link>
        </h1>
        <h1>
          <Link to="/creators">
            Creators
          </Link>
        </h1>
        <h1>
          <Link to="/characters">
            Characters
          </Link>
        </h1>
      </div>
    )
  }

  render () {
    return (
      <div className="wrapper">
        <Helmet>
          <meta charSet="utf-8"/>
          <meta property="og:title"
                content="Marvellous Browser"/>
          <meta property="og:description"
                content="Browse & search the Marvel comic library"/>
          <meta property="og:image"
                content={`${window.location.origin}/marvel.jpg`}/>
          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/apple-touch-icon-152x152.png" />
          <link rel="icon" type="image/png" href="/favicon-196x196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/favicon-128.png" sizes="128x128" />
          <meta name="application-name" content="Marvellous Browser"/>
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta name="msapplication-square70x70logo" content="/mstile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="/mstile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="/mstile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="/mstile-310x310.png" />
          <title>Marvellous</title>
        </Helmet>

        <Progress.Component/>
        <Toolbar/>

        {this.renderChildren(this.props.children)}
        {this.renderRootContent(this.props.children)}
      </div>
    )
  }

}
