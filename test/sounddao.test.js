const SoundCoin = artifacts.require('SoundCoin');
const GameMechanics = artifacts.require('GameMechanics');
const CreatorSupport = artifacts.require('CreatorSupport');

contract('SoundCoin', (accounts) => {
    let soundCoin;
    const owner = accounts[0];

    beforeEach(async () => {
        soundCoin = await SoundCoin.new();
    });

    it('should mint coins correctly', async () => {
        await soundCoin.mint(owner, 1000);
        const balance = await soundCoin.balanceOf(owner);
        assert.equal(balance.toString(), '1000', 'Balance should be 1000');
    });
});

contract('GameMechanics', (accounts) => {
    let gameMechanics;
    const player1 = accounts[1];
    const player2 = accounts[2];

    beforeEach(async () => {
        gameMechanics = await GameMechanics.new();
    });

    it('should start a new game correctly', async () => {
        await gameMechanics.startGame(player1, player2);
        const gameState = await gameMechanics.getGameState(player1);
        assert.equal(gameState.toString(), '1', 'Game state should be 1 (started)');
    });
});

contract('CreatorSupport', (accounts) => {
    let creatorSupport;
    const creator = accounts[3];

    beforeEach(async () => {
        creatorSupport = await CreatorSupport.new();
    });

    it('should allow creator to receive support', async () => {
        await creatorSupport.supportCreator(creator, 500);
        const supportAmount = await creatorSupport.getSupport(creator);
        assert.equal(supportAmount.toString(), '500', 'Support amount should be 500');
    });
});
