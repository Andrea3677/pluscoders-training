function concat() {
    var texts = Array.from(arguments);
    var result = ""

    texts.forEach(function(item) {
        result += item
    })

    return result
}


// TESTS

    // CASE text is empty
        var result = concat('','')

        console.assert(typeof result === 'string', 'result must be a string')
        console.assert(result.length === 0, 'result.length is no correct')
        console.assert(result === '', 'result is not the right solution')

    // CASE text is "👋", "😊", "🤙"
        var result = concat("👋", "😊", "🤙")

        console.assert(typeof result === 'string', 'result must be a string')
        console.assert(result === '👋😊🤙', 'result is not the right solution')
        
    // CASE text is "Hola", ",", " ", "Mundo", "!"
        var result = concat("Hola", ",", " ", "Mundo", "!")
        
        console.assert(typeof result === 'string', 'result must be a string')
        console.assert(result === 'Hola, Mundo!', 'result is not the right solution')

    // CASE text is 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        var result = concat(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
            
        console.assert(typeof result === 'string', 'result must be a string')
        console.assert(result === '012345678910', 'result is not the right solution')

    // CASE text is 'no much to concat here'
        var result = concat('no much to concat here')
                
        console.assert(typeof result === 'string', 'result must be a string')
        console.assert(result === 'no much to concat here', 'result is not the right solution')

    // CASE text is " ", " "
        var result = concat(" ", " ")
                    
        console.assert(typeof result === 'string', 'result must be a string')
        console.assert(result === '  ', 'result is not the right solution')



// ------------------------------------------------------------------------------------------------------------ VERSION 1

// TODO cómo manejar argumentos variables en JS
// TODO Revisar https://developer.mozilla.org/es/docs/Web/JavaScript/Data_structures para ver el porqué me sale que no es string y a la vez que sí
// TODO Rehacer sin ...restArgs --> https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/arguments

function concat(...strings) {
    var result = new String
    
    for (var i = 0; i < strings.length; i++) {
        var string = strings[i]
    }

    return result
}


// ------------------------------------------------------------------------------------------------------------ VERSION 2

// TODO No usar Arrow functions 
// TODO Mirar chicha de argumentos "Array.prototype.slice.call(arguments)"  =>  Usar arguments sin slice (a pelo)


function concat() {
    var texts = Array.prototype.slice.call(arguments);
    var result = ""

    texts.forEach(item => {
        result += item
    })

    return result
}