document.addEventListener('DOMContentLoaded', () => {
    const expCards = document.querySelectorAll('.exp-card');

    expCards.forEach(card => {
        card.addEventListener('click', () => {
            // If already active, do nothing (keep it open)
            if (card.classList.contains('active')) return;

            // Find all cards in the same container as the clicked card
            const container = card.closest('.exp-card-container');
            const siblingCards = container.querySelectorAll('.exp-card');

            // Remove active class from all other cards in the same container
            siblingCards.forEach(sibling => {
                sibling.classList.remove('active');
            });

            // Add active class to clicked card
            card.classList.add('active');
        });
    });
});
