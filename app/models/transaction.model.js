module.exports = mongoose => {
    const Transaction = mongoose.model(
      "transaction",
      mongoose.Schema(
        {
          from_address: String,
          from_name: String,
          to_address: String,
          to_name: String,
          description: String,
          date: String,
          amount: String
        },
        { timestamps: true }
      )
    );
  
    return Transaction;
  };