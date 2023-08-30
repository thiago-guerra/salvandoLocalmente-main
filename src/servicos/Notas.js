import { db } from "./SQLite";

export function criarTabela() {
    db.transaction(tx => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS " +
            "Notas "+
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);"
        );
    });
}

export async function adicionaNota (nota){
    return new Promise((resolve) =>{
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Notas (titulo, categoria, texto) values (?, ?, ?);",
                [nota.titulo, nota.categoria, nota.texto],
                () => {
                    resolve("Nota adicionada com sucesso!");    
                }
            );
        });
    });
}

export async function buscaNotas (){
    return new Promise((resolve) =>{
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Notas;",
                [],
                (tx, result) => {
                    resolve(result.rows._array);    
                }
            );
        });
    });
}

export async function atualizaNota (nota){
    return new Promise((resolve) =>{
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE Notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;",
                [nota.titulo, nota.categoria, nota.texto , nota.id],
                () => {
                    resolve("Nota atualizada com sucesso!");    
                }
            );
        });
    });
}

export async function removerNota (nota){
    return new Promise((resolve) =>{
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM Notas WHERE id = ?;",
                [nota.id],
                () => {
                    resolve("Nota removida com sucesso!");    
                }
            );
        });
    });
}

export async function buscarNotaPorCategoria(categoria) {
    return new Promise((resolve) => {
        db.transaction(tx => { 
            tx.executeSql(
                "SELECT * FROM Notas WHERE categoria = ?;",
                [categoria],
                (tx, result) => {
                    resolve(result.rows._array);    
                }
            );
        });
    });
}