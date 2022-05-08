import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  // ManyToMany,
  JoinTable,
} from 'typeorm';

import { Brand } from './brand.entity';
// import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Implicity JoinColumn
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  // @ManyToMany(() => Category, (category) => category.products)
  // @JoinTable() // Solo en un lado de la relacion (tabla intermedia)
  // categories: Category[];
}
