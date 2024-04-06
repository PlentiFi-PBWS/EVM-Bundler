import { Contract } from "ethers";
import { Request, Response, Router, json } from "express";
import { SIGNER } from "../constants";


const router: Router = Router();
router.use(json());
router.post("/", async (req: Request, res: Response) => {
  try {
    const { factory, login, entropy } = req.body as {
      factory: string, // target address
      login: string, // amount to send (in wei)
      entropy: number, // call data
    };

    const factoryContract = new Contract(
      factory,
      [
        'function createAccount(string calldata login, uint256 salt) public returns (WebAuthnAccount)',
        'function getAddress(string calldata login, uint256 salt) public view returns (address)'
      ],
      SIGNER
    );

    const tx = await factoryContract.createAccount(login, entropy, { gasLimit: 6721975 });
    console.log('Deploy transaction submitted:', tx);
    await tx.wait();
    console.log('Deploy transaction confirmed:', tx.hash);

    res.status(200).json({ message: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
