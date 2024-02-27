import React from 'react'
import Navigation from './Navigation'

const Header = ({changePage}) => {
    return (
        <header>
            <Navigation changePage={changePage} />
            <h1 className="text-center py-4">Luke Skywalker</h1>
        </header>
    )
}

export default Header