class AIProvider {
  async generateText(_prompt, _options = {}) {
    throw new Error("AI provider generateText() is not implemented.");
  }
}

export default AIProvider;
