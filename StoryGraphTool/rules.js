class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);
        
        if (key === "Hallway") {
            const keyLocation = this.engine.storyData.Locations["Key"];
            if (keyLocation.Choices.length === 0) {
                // Player has the key, provide choice to open the door
                this.engine.addChoice("Open the door?", "Room");
            } else {
                // Player doesn't have the key, inform that the door is locked
                this.engine.addChoice("The door is locked. You need to find a key.");
            }
        }
        
        if (locationData.Choices && locationData.Choices.length > 0) {
            for (let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice.Target);
            }
        } else {
            this.engine.addChoice("The end.");
        }
    }

    handleChoice(choice) {
        if (choice) {
            this.engine.gotoScene(Location, choice);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'mystory.json');
