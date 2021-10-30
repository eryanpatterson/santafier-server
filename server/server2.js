const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    const doggoSchema = new mongoose.Schema({
        name: String
    });
    
    doggoSchema.methods.speak = function speak() {
        const greeting = this.name
        ? "Ruff! My name is " + this.name
        : "I don't have a name.";
        console.log(greeting);
    };

    const Pupper = mongoose.model('Pupper', doggoSchema);

    const reggie = new Pupper({ name: 'Reggie' });
    console.log(reggie.name);
    
    const maybell = new Pupper({ name: 'Maybell' });
    await maybell.save();
    maybell.speak();

    const puppers = await Pupper.find();
    console.log(puppers);
}