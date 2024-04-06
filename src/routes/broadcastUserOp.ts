import { ethers } from "ethers";
import { Request, Response, Router, json } from "express";
import { SIGNER } from "../constants";


const router: Router = Router();
router.use(json());
router.post("/", async (req: Request, res: Response) => {
  try {
    const { smartAccount, target, value, callData, signature, userOpHash } = req.body as {
      smartAccount: string, // smart account address
      target: string, // target address
      value: string, // amount to send (in wei)
      callData: string, // call data
      signature: string, // signature
      userOpHash: string, // user operation hash
    };

    const smartAccountContract = new ethers.Contract(smartAccount, ["function execute(address dest, uint256 value, bytes calldata func, bytes memory signature, bytes32 userOpHash) external"], SIGNER);

    const tx = await smartAccountContract.execute(target, value, callData, signature, userOpHash, { gasLimit: 6721975 });
    console.log('Transaction submitted:', tx);
    await tx.wait();
    console.log('Transaction confirmed:', tx.hash);

    res.status(200).json({ message: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
