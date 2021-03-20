let challengeInfo = {}

function setChallengeInfo(name, info)
{
    challengeInfo[name] = info;
}

function getChallengeInfo(name)
{
    return challengeInfo[name];
}

function deleteChallengeInfo(name)
{
    delete challengeInfo[name];
}

module.exports={
    setInfo:setChallengeInfo,
    getInfo:getChallengeInfo,
    deleteInfo: deleteChallengeInfo
}