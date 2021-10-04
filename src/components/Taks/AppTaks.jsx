import React from 'react'
import CardsTaks from './CardsTaks'
import CardSelect from './CardSelect'
import AddTaks from './AddTaks'
import '../../styles/Login.css'
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { Navbar } from '../app/Navbar'

const Main = styled.main`
    width: 110%;
`

const AppTaks = () => {
    const { card } = useSelector(state => state.card)

    return (
        <div className="App">
            
            <Navbar />

            <div className="container ">
                <div className="row mt-4">
                    <div className="col-md-4 text-center py-3">
                        <img src="https://c.tenor.com/8sTMqGWjYAQAAAAM/ball-pokemon.gif" className="App-logo log " alt="logo" />
                        <AddTaks />
                    </div>

                    <div className="col-md-8">
                        <Main className="row">
                            <main>
                                {
                                    (card.length !== 0)
                                        ? <CardsTaks card={card} />
                                        : <CardSelect />
                                }
                            </main>
                        </Main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppTaks