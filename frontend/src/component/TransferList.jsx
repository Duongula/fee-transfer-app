import TransferItem from './TransferItem';

function TransferList({ transfers, user }) {

    return (
        <div>
            <div>
                {transfers.map(transfer => {
                    return (
                        <TransferItem transfer={transfer} user={user} key={transfer._id} />
                    )
                })}
            </div>
        </div>
    )
}

export default TransferList