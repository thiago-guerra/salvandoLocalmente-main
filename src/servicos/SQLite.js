import * as SQLite from 'expo-sqlite';

function AbrirConexao() {
    const dataBase = SQLite.openDatabase('db.db');
    return dataBase;
}

export const db = AbrirConexao();