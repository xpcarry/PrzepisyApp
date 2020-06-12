package io.API.models;

import javax.persistence.*;
import java.lang.reflect.Array;
import java.util.Date;

@Entity
@Table(name="recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "recipe_id")
    private String id;

    @Column(name = "title")
    private String title;

    @Column(name = "ingredients")
    private Array ingredients;

    @Column(name = "calories")
    private int calories;

    @Column(name = "recipeType")
    private String recipeType;

    @Column(name = "recipeDifficulty")
    private String recipeDifficulty;

    @Column(name = "description")
    private String description;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "datePosted")
    private Date datePosted;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Array getIngredients() {
        return ingredients;
    }

    public void setIngredients(Array ingredients) {
        this.ingredients = ingredients;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public String getRecipeType() {
        return recipeType;
    }

    public void setRecipeType(String recipeType) {
        this.recipeType = recipeType;
    }

    public String getRecipeDifficulty() {
        return recipeDifficulty;
    }

    public void setRecipeDifficulty(String recipeDifficulty) {
        this.recipeDifficulty = recipeDifficulty;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Date getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(Date datePosted) {
        this.datePosted = datePosted;
    }
}
