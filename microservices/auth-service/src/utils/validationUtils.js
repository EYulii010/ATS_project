
const validateNicaraguanRUC = (ruc) => {
    if (!ruc || typeof ruc !== 'string') {
        return false;
    }
    
    // Removes any hyphens or spaces the user might have typed
    const cleanRUC = ruc.replace(/[-\s]/g, ''); 
    
    // Regex: Starts with J (or j), followed by exactly 13 digits
    const rucRegex = /^[Jj]\d{13}$/; 
    
    return rucRegex.test(cleanRUC);
};

module.exports = {
    validateNicaraguanRUC,
}