var userSchema = new Schema
  ({ 
    Id: Schema.Types.ObjectId,
    email: { type: String, lowercase: true, trim: true },
    password: String,
    displayName: String,
    firstName: String,
    lastName: String,
    securityQuestion: String,
    securityAnswer: String,
    //isDoctor: Boolean,
    organizationId: [Schema.Types.ObjectId],
    location: [String],
    role: String,
    active: Boolean,
    creationDate: String
  });

module.exports = User = mongoose.model('User', userSchema); 