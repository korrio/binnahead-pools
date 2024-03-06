import { BigNumber, BigNumberish } from 'ethers';
import { poseidon } from 'pools-ts';
import { Commitment } from '../state';
import { useCommitments, useNote, useDebounce } from '../hooks';

export function useExistingCommitments() {
  const { commitments } = useCommitments();

console.log("useCommitments",commitments)

  const { commitment, secret } = useNote();
  const debouncedCommitments = useDebounce<Commitment[]>(commitments, 500);

  // console.log("debouncedCommitments",debouncedCommitments)

  let leafIndexToIndex: { [leafIndex: number]: number } = {};
  let existingCommitments: (Commitment & { nullifier: string })[] = [];

  // console.log("!debouncedCommitments || !commitment || !secret",!debouncedCommitments || !commitment || !secret)

  // console.log("!debouncedCommitments",!debouncedCommitments)
  // console.log("!commitment",!commitment)
  // console.log("!secret",!secret)

  // console.log(
  //   "thecommitment",commitment)


  if (!debouncedCommitments || !commitment || !secret) {
    return { existingCommitments, leafIndexToIndex };
  }

  for (let i = 0; i < debouncedCommitments.length; i++) {
    const commitmentData = debouncedCommitments[i];
    // console.log("commitmentData",commitmentData)
    // console.log("BigNumber.from(commitmentData.commitment).eq(commitment as BigNumberish)",BigNumber.from(commitmentData.commitment).eq(commitment as BigNumberish))
    if (
      true
    ) {
      leafIndexToIndex[Number(commitmentData.leafIndex)] =
        existingCommitments.length;
      existingCommitments.push({
        nullifier: BigNumber.from(poseidon([
          secret,
          1,
          commitmentData.leafIndex
        ] as BigNumberish[]).toString()).toHexString(),
        ...commitmentData
      });
    }
  }

  return { existingCommitments, leafIndexToIndex };
}
