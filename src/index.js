import React, {useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";

import api from "./services/api"

export default function App(){

const [projects,setProjects] = useState([]);

useEffect(() => {
    api.get("/projects").then(response => {
        setProjects(response.data);
        console.log(response.data);
    }).catch("Erro na requisição");
}, []);


async function handleAddProject(){
    const response = await api.post("/projects",{
        title: `Novo projeto ${Date.now()}`,
        owner: "Hector Chaves" 
    })

    const project = response.data;

    setProjects([...projects, project])

}


return (

    <>
        <StatusBar barStyle="light-content" backgroundColor="green"/>

        <SafeAreaView style={styles.container}>

        <FlatList 
        data={projects} 
        keyExtractor={project => project.id}
        renderItem={({ item : project})=>(
            <Text style={styles.title}>{project.title}</Text>
            )}
            />

        {/* <View style={styles.container}>
            {projects.map(project => {
                return <Text style={styles.title} key={project.id}>{project.title}</Text>
            })}
            
        </View> */}
        {/* <View style={styles.container}>
            <Text style={styles.title}>teste</Text>
        </View> */}

        <TouchableOpacity activeOpacity={1} onPress={handleAddProject} style={styles.button}>
            <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
        </SafeAreaView>
    </>
);
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#7159c1",
        justifyContent: "center",
        alignItems: "center",
    },

    title:{
        color: "#FFF",
        fontSize: 20,
        // fontWeight: "bold",
    },
    button:{
        alignSelf:"stretch",
        backgroundColor: "#FFF",
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent:"center",
        alignItems:"center"

    },
    buttonText:{
        fontWeight: "bold",
        fontSize: 16,

    }
})

/*
scrollview - faz com que a tela possua a função scroll
a scrollview não pode possuir as propriedades alignItems e justifyContent

flatList - componente para listas no react native
    variáveis dentro da flatlist
    data - variável que armazena os dados da lista. precisa ser um array
    keyextractor - função que retorna a informação única dentro do array informado em data
    renderitem ->  função que renderiza a lista
        a função render recebe várias informações sobre a lista.
        a mais importante é o item, que representa cada um dos itens do array informado

        renomeando item para project para facilitar a compreensão

        renderItem={({ item: projects })=>{
            <Text style={styles.title}>{project.title}</Text>

        com o código acima, a variável item foi apenas renomeada para facilitar a compreensão e a aplicação no

SafeAreaView - exibe o que está dentro dele em uma área visível da aplicação



button no react native - um dos poucos componentes que tem uma estilização própria de acordo com a plataforma (android ou ios)

componentes touchable podem ser utilizados como botões

touchableopacity - quando clicado, diminui um pouco a opacidade

no react native onPress é o equivalente do onClick
*/