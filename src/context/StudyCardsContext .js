import { Children, createContext, useEffect, useState } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const StudyCardsContext = createContext() 

export const StudyCardsProvider = ({children}) =>{

    const [cards, setCards] = useState([])

    useEffect(() => {
        loadCards()

    }, [] ) 

    const loadCards = async () => {
        const storedCards = await AsyncStorage.getItem('cards')

        if (storedCards) setCards(JSON.parse(storedCards))


    }
    const addCard = async(card) => {
        const newCards = [...cards,{ ...card, id:Date.now() }]
        setCards(newCards)
        await AsyncStorage.setItem('cards',JSON.stringify(newCards) )

    }
    const updateCard = async(id, updates) =>{
        const newCards = cards.map(card => card.id === id ? {
            card, ...updates 
        }: card)
        setCards(newCards)
        await AsyncStorage.setItem('cards',JSON.stringify(newCards))
    }

    const deletCard = async (id) => {
        const newCards = cards.filter(card=> card.id !== id)
        setCards (newCards) 
        await AsyncStorage.setItem('cards', JSON.stringify(newCards))
    }

    return(
        <StudyCardsContext.Provider value={{cards, addCard,updateCard,deletCard}}>
            {children}

        </StudyCardsContext.Provider>
    )
}
export default StudyCardsContext