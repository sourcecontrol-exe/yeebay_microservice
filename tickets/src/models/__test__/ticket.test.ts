import {Ticket} from '../ticket';

it('implements optimistic concurtrnet y test', async (done) =>{
    //creat a n instance of a ticket 

    const ticket = Ticket.build({
        title : 'concert',
        price : 1,
        userId: '123'
    });



    //save the ticket 
     ticket.save();    
    //fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    //mkae two seperate cahnge to the ticket  fetched
    const secondInstance = await Ticket.findById(ticket.id); 
    //save the first fetched ticket

    firstInstance!.set({price:10});
    secondInstance!.set({price: 15});

    await firstInstance!.save();

    // save the secons fetched ticket asb expect an error
    try {
        await secondInstance!.save();
    }
    catch(err){
        return done();
    }
    
    throw new Error("should not reach this point")
})

it('increment the veriion number of the documnet', async ()=>{
    const ticket = Ticket.build({
        title : "concert",
        price : 23,
        userId: "123"
    })
    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
})