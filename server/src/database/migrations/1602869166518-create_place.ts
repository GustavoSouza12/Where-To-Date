import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPlacesToDate1602789222181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Realizar alterações no database
        // Criar tabela, criar no vo camp, deletar
        await queryRunner.createTable(new Table({
            name: 'placestodate',
            
            columns: [
            {
                name: 'id',
                type: 'integer',
                unsigned: true,
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
               name: 'name',
               type: 'text' 
            },
            {
               name: 'latitude',
               type: 'decimal',
               scale: 10,
               precision: 2 
            },
            {
                name: 'longitude',
                type: 'decimal',
                scale: 10,
                precision: 2 
             },
             {
                 name: 'about',
                 type: 'text'
             },
             {
                 name: 'howToArrive',
                 type: 'text'
             },
             {
                 name: 'open_on_weekends',
                 type: 'boolean',
                 default: true,
                 
             }
            ]    
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable('placestodate')
    }

}
