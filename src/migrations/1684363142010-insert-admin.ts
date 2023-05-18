import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertAdmin1684363142010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            INSERT INTO public.user(
                name, email, cpf, type_user, phone, password)
                VALUES ('admin', 'admin@admin.net', '1234567890', 2, '31925325252', '$2b$10$BhaMKrzUdPJFaHLcdvls7.lFMHojH9/sG/jwrp.Is0YXIlpBe4gI.');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DELETE FROM public.user
                WHERE email like 'admin@admin.net';
        `);
  }
}
