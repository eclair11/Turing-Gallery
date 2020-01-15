package fr.ujm.turgal.model;

import lombok.Data;

@Data
public class Test {
    String name;
    public Test(String name){
        this.name = name;
    }
}