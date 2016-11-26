-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Departments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Departments` (
  `idDepartments` INT NOT NULL AUTO_INCREMENT,
  `nameDepartments` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idDepartments`),
  UNIQUE INDEX `idDepartments_UNIQUE` (`idDepartments` ASC),
  UNIQUE INDEX `nameDepartments_UNIQUE` (`nameDepartments` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CourseInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CourseInfo` (
  `codeCourses` VARCHAR(45) NOT NULL,
  `term` VARCHAR(45) NULL,
  `titleCourses` VARCHAR(100) NOT NULL,
  `crn` INT NOT NULL,
  `hours` INT NOT NULL,
  `days` VARCHAR(45) NOT NULL,
  `startTime` VARCHAR(45) NOT NULL,
  `endTime` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `lmt` INT NOT NULL,
  `enr` INT NOT NULL,
  `wlCap` INT NOT NULL,
  `wlAct` INT NOT NULL,
  `idCourse` INT NOT NULL,
  `idDepartments` INT NOT NULL,
  PRIMARY KEY (`crn`, `idCourse`, `idDepartments`),
  UNIQUE INDEX `idCourse_UNIQUE` (`idCourse` ASC),
  INDEX `idDepFK_idx` (`idDepartments` ASC),
  CONSTRAINT `idDepFK`
    FOREIGN KEY (`idDepartments`)
    REFERENCES `mydb`.`Departments` (`idDepartments`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Instructors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Instructors` (
  `idInstructors` INT NOT NULL,
  `nameInstructors` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idInstructors`),
  UNIQUE INDEX `idInstructors_UNIQUE` (`idInstructors` ASC),
  UNIQUE INDEX `nameInstructors_UNIQUE` (`nameInstructors` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`InstVsCourse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`InstVsCourse` (
  `idInstructors` INT NOT NULL,
  `crn` INT NOT NULL,
  PRIMARY KEY (`idInstructors`, `crn`),
  INDEX `crnFK_idx` (`crn` ASC),
  CONSTRAINT `idInstFK`
    FOREIGN KEY (`idInstructors`)
    REFERENCES `mydb`.`Instructors` (`idInstructors`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `crnFK`
    FOREIGN KEY (`crn`)
    REFERENCES `mydb`.`CourseInfo` (`crn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
