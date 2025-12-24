// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.4;  
  
import "../src/Exchange.sol"; // Contains IExchangeModule interface  
import "../src/ExchangeTypes.sol"; // Contains necessary structs like DerivativeOrder  
  
contract ExchangeDemo {  
    address constant exchangeContract = 0x0000000000000000000000000000000000000065;  
    IExchangeModule exchange = IExchangeModule(exchangeContract);  
  
    /***************************************************************************  
     * Calling the precompile directly (contract acts on its own behalf)  
    ****************************************************************************/  
  
    /**  
     * @notice Deposits funds from the contract's balance into one of its exchange subaccounts.  
     * @param subaccountID The target subaccount ID (derived from the contract's address).  
     * @param denom The denomination of the asset to deposit (e.g., "inj").  
     * @param amount The quantity of the asset to deposit.  
     * @return success Boolean indicating if the deposit was successful.  
     */  
    function deposit(  
        string calldata subaccountID,  
        string calldata denom,  
        uint256 amount  
    ) external returns (bool) {  
        try exchange.deposit(address(this), subaccountID, denom, amount) returns (bool success) {  
            return success;  
        } catch Error(string memory reason) {  
            revert(string(abi.encodePacked("Deposit error: ", reason)));  
        } catch {  
            revert("Unknown error during deposit");  
        }  
    }  
  
    /**  
     * @notice Withdraws funds from one of the contract's exchange subaccounts to its main balance.  
     * @param subaccountID The source subaccount ID.  
     * @param denom The denomination of the asset to withdraw.  
     * @param amount The quantity of the asset to withdraw.  
     * @return success Boolean indicating if the withdrawal was successful.  
     */  
    function withdraw(  
        string calldata subaccountID,  
        string calldata denom,  
        uint256 amount  
    ) external returns (bool) {  
        try exchange.withdraw(address(this), subaccountID, denom, amount) returns (bool success) {  
            return success;  
        } catch Error(string memory reason) {  
            revert(string(abi.encodePacked("Withdraw error: ", reason)));  
        } catch {  
            revert("Unknown error during withdraw");  
        }  
    }  
  
    /**  
     * @notice Queries the derivative positions for a given subaccount of this contract.  
     * @param subaccountID The subaccount ID to query.  
     * @return positions An array of DerivativePosition structs.  
     */  
    function subaccountPositions(  
        string calldata subaccountID  
    ) external view returns (IExchangeModule.DerivativePosition[] memory positions) {  
        // Note: View functions calling precompiles might behave differently based on node configuration  
        // For on-chain state, this is fine. For off-chain queries, direct gRPC/API queries are often preferred.  
        return exchange.subaccountPositions(subaccountID);  
    }  
  
    /**  
     * @notice Creates a new derivative limit order from the contract's subaccount.  
     * @param order The DerivativeOrder struct containing order details.  
     * @return response The response struct containing details like order hash.  
     */  
    function createDerivativeLimitOrder(  
        IExchangeModule.DerivativeOrder calldata order  
    ) external returns (IExchangeModule.CreateDerivativeLimitOrderResponse memory response) {  
        try exchange.createDerivativeLimitOrder(address(this), order) returns (IExchangeModule.CreateDerivativeLimitOrderResponse memory resp) {  
            return resp;  
        } catch Error(string memory reason) {  
            revert(string(abi.encodePacked("CreateDerivativeLimitOrder error: ", reason)));  
        } catch {  
            revert("Unknown error during createDerivativeLimitOrder");  
        }  
    }  
}