const mongoose = require('mongoose');

const { Schema } = mongoose; 

const componentsSchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        data: { type: Object, required: true }
    },
    { timestamps: true }
)

const Component = mongoose.model('Components', componentsSchema);

module.exports = Component;