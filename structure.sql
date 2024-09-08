-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema gooolstore
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gooolstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gooolstore` DEFAULT CHARACTER SET utf8mb4 ;
USE `gooolstore` ;

-- -----------------------------------------------------
-- Table `gooolstore`.`talles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gooolstore`.`talles` ;

CREATE TABLE IF NOT EXISTS `gooolstore`.`talles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `gooolstore`.`marcas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gooolstore`.`marcas` ;

CREATE TABLE IF NOT EXISTS `gooolstore`.`marcas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `gooolstore`.`productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gooolstore`.`productos` ;

CREATE TABLE IF NOT EXISTS `gooolstore`.`productos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` LONGTEXT NOT NULL,
  `imagen` VARCHAR(255) NOT NULL,
  `color` VARCHAR(255) NOT NULL,
  `precio` DECIMAL(8,2) NOT NULL,
  `id_talle` INT(11) NOT NULL,
  `id_marca` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `id_talles_idx` (`id_talle` ASC) ,
  INDEX `id_marcas_idx` (`id_marca` ASC) ,
  CONSTRAINT `id_talles`
    FOREIGN KEY (`id_talle`)
    REFERENCES `gooolstore`.`talles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_marcas`
    FOREIGN KEY (`id_marca`)
    REFERENCES `gooolstore`.`marcas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `gooolstore`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gooolstore`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `gooolstore`.`usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `dni` VARCHAR(50) NOT NULL,
  `telefono` VARCHAR(20) NOT NULL,
  `domicilio` VARCHAR(255) NOT NULL,
  `pais` VARCHAR(255) NOT NULL,
  `nombre_usuario` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `tipo_usuario` VARCHAR(255) NOT NULL,
  `genero` VARCHAR(20) NOT NULL,
  `foto_perfil` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `gooolstore`.`carritos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gooolstore`.`carritos` ;

CREATE TABLE IF NOT EXISTS `gooolstore`.`carritos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(11) NOT NULL,
  `id_producto` INT(11) NOT NULL,
  `cantidad` INT(11) NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `id_carrito_idx` (`id_usuario` ASC) ,
  INDEX `id_producto_idx` (`id_producto` ASC) ,
  CONSTRAINT `fk_carrito_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `gooolstore`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carrito_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `gooolstore`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
